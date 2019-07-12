import IconDeleteCells from 'quill/assets/icons/table-delete-cells.svg'
import IconDeleteRows from 'quill/assets/icons/table-delete-rows.svg'
import IconDeleteColumns from 'quill/assets/icons/table-delete-columns.svg'
import IconInsertRows from 'quill/assets/icons/table-insert-rows.svg'
import IconInsertColumns from 'quill/assets/icons/table-insert-columns.svg'
import Delta from 'quill-delta';

import { BaseModule } from './BaseModule';

export class Toolbar extends BaseModule {
    onCreate = (that) => {
    	this.quill = that.quill;
    	this.parentModule = that;
		// Setup Toolbar
        this.toolbar = document.createElement('div');
        Object.assign(this.toolbar.style, this.options.toolbarStyles);
        this.quill.root.parentNode.appendChild(this.toolbar);
        this.onUpdate();

        // Setup Buttons
        this._definebuttons();
        this._addToolbarButtons();

        this.table_functions = this.quill.getModule('table');
    };

	// The toolbar and its children will be destroyed when the overlay is removed
    onDestroy = () => {
    	this.toolbar.remove();
    };

	// Nothing to update on drag because we are are positioned relative to the overlay
    onUpdate = () => {
    	if (!this.table || this.table.rows.length === 0) {
    		this.parentModule.hide();
    		return;
    	}

    	const parent = this.quill.root.parentNode;
    	this.toolbar.style.top = this.table.getBoundingClientRect().top -
    		this.quill.root.parentNode.getBoundingClientRect().top - 30  +
    		parent.scrollTop + 'px';
    	if (parseInt(this.toolbar.style.top) < 0) {
    		this.toolbar.style.top = 0;
    	}
    };

    _definebuttons = () => {
        this.buttons = [
			{
				name: 'insert-row',
				icon: IconInsertRows,
                apply: () => {
					this.table_functions.insertRowBelow();
                },
                isApplied: () => { },
			},
			{
				name: 'delete-row',
                icon: IconDeleteRows,
                apply: () => {
					this.table_functions.deleteRow();
                },
                isApplied: () => { },
			},
			{
				name: 'insert-column',
                icon: IconInsertColumns,
                apply: () => {
					this.table_functions.insertColumnRight();
                },
                isApplied: () => { },
			},
			{
				name: 'delete-column',
                icon: IconDeleteColumns,
                apply: () => {
					this.table_functions.deleteColumn();
                },
                isApplied: () => { },
			},
			{
				name: 'delete-cells',
                icon: IconDeleteCells,
                apply: () => {
					this.table_functions.deleteTable();
					this.table = undefined;
                },
                isApplied: () => { },
			},

        ];
    };

    _addToolbarButtons = () => {
		const buttons = [];
		this.buttons.forEach((button_def, idx) => {
			const button = document.createElement('span');
			button.setAttribute('title', button_def.name);
			buttons.push(button);
			button.innerHTML = button_def.icon;
			button.addEventListener('click', () => {
				this._selectButton(button, true);
				this.quill.focus();
				button_def.apply();
				this.requestUpdate();
			});
			Object.assign(button.style, this.options.toolbarButtonStyles);
			if (idx > 0) {
				button.style.borderLeftWidth = '0';
			}
			Object.assign(button.children[0].style, this.options.toolbarButtonSvgStyles);
			// if (button_def.isApplied()) {
			// 	// select button if previously applied
			// 	this._selectButton(button);
			// }
			this.toolbar.appendChild(button);
		});
    };

    _selectButton = (button, auto_revert) => {
		button.style.filter = 'invert(20%)';
		if (auto_revert) {
			setTimeout(function(){
				button.style.filter = '';
			}, 100);
		}
	};
}
