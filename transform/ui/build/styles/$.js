var Oo = require ('o-o-o-o-o') .Oo
var o = require ('o-o-o-o-o') .o
var oO = require ('o-o-o-o-o') .oO
var R = require ('ramda')

var path = require ('path')
var fs = require ('fs-extra')
var file = require ('__/util') .file
var files = require ('__/util') .files
var write = require ('__/util') .write
var prepare = require ('__/util') .prepare

var ui_paths = require ('__/config') .paths 

var styles = require ('./style_tree')
					
					


;; prepare (ui_paths .styles .build)

;; Oo (R .concat (files ('.css') (ui_paths .styles .src), files ('.scss') (ui_paths .styles .src)), 
	o (R .map (x => ({
		_path: x,
		contents: file (x)
	}))),
	o (R .map (x => ({
		names: [ Oo (x ._path, o (R .split ('/')), o (R .last), o (R .split ('.')), o (R .head)) ],
		path: x ._path .slice (ui_paths .styles .src .length),
		dependencies: [],
		metastyles: x .contents
	}))),
	o (function (build_nodes) {
		var tree = styles .weave (build_nodes)

		~ styles .invalidate ();

		var answer = styles .grow (tree)

		~ styles .clean ();

		return answer 
	}),
	o (R .chain (function (branch) {
		//console .log ('debug: ' + JSON .stringify (R .omit (['styles', 'metastyles']) (branch), null, 4));
		return !! (branch .path === '*') ?
			[branch .styles]
		:
			[]
	})),
	o (R .tap (function (branches) {
		if (branches .length !== 1)
			throw 'can\'t find answer' + '\n\n' + '\n' + 'branches length is ' + branches .length  
	})),
	o (R .head),
	oO (write (ui_paths .styles .build)))