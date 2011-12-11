/**
 * Created by JetBrains PhpStorm.
 * User: mbeck
 * Date: 11.12.11
 * Time: 22:36
 * To change this template use File | Settings | File Templates.
 */

// require("js/omv/data/DataProxy.js")
// require("js/omv/data/Store.js")
// require("js/omv/grid/GridPanel.js")
// require("js/omv/form/plugins/FieldInfo.js")
// require("js/omv/util/Format.js")

Ext.ns("OMV.Module.Services.Greyhole.Admin");

/**
 * @class OMV.Module.Services.Greyhole.Admin.PoolDiskPanel
 * @derived OMV.CfgObjectDialog
 */
OMV.Module.Services.Greyhole.Admin.PoolDiskPanel = function(config) {
	var initialConfig = {
		rpcService: "Greyhole",
		rpcGetMethod: "getPoolDisk",
		rpcSetMethod: "setPoolDisk",
		title: ((config.uuid == OMV.UUID_UNDEFINED) ? "Add" : "Edit") + " pool disk",
		width: 550,
		autoHeight: true
	};
	Ext.apply(initialConfig, config);
	OMV.Module.Services.Greyhole.Admin.PoolDiskPanel.superclass.constructor.call(this, initialConfig);
};
Ext.extend(OMV.Module.Services.Greyhole.Admin.PoolDiskPanel,
  OMV.CfgObjectDialog, {
	initComponent : function() {
		OMV.Module.Services.Greyhole.Admin.PoolDiskPanel.superclass.initComponent.apply(this, arguments);
		// Register event handler
		this.on("load", this._updateFormFields, this);
	},

	getFormConfig : function() {
		return {
			autoHeight: true
		};
	},

	getFormItems : function() {
		return [{
			xtype: "combo",
			name: "mntentref",
			hiddenName: "mntentref",
			fieldLabel: "Volume",
			emptyText: "Select a volume ...",
			allowBlank: false,
			allowNone: false,
			editable: false,
			triggerAction: "all",
			displayField: "description",
			valueField: "uuid",
			store: new OMV.data.Store({
				remoteSort: false,
				proxy: new OMV.data.DataProxy("Greyhole", "getPoolDiskCandidates"),
				reader: new Ext.data.JsonReader({
					idProperty: "uuid",
					fields: [
						{ name: "uuid" },
						{ name: "description" }
					]
				})
			})
		}];
	},

	/**
	 * Private function to update the states of various form fields.
	 */
	_updateFormFields : function() {
		if (this.uuid == OMV.UUID_UNDEFINED)
			return;
		var fields = [ "name", "mntentref" ];
		for (var i = 0; i < fields.length; i++) {
			var field = this.findFormField(fields[i]);
			if (!Ext.isEmpty(field)) {
				field.setReadOnly(true);
			}
		}
	}
});