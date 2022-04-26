const vscode = require('vscode');
const path = require("path")
const fs = require("fs")
const files = require("./files.js")
const mainDir = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath,"src")


const resolveSrcFolder = ()=>{
	return fs.existsSync(path.join(mainDir,"src"))
}

const initRedux = () => {

	if(!resolveSrcFolder()){
		vscode.window.showErrorMessage("YOU SHOULD BE WORKING IN REACT ENVIRONMENT WITH SRC FOLDER 😒!!")
		return 0
	}

	if (!fs.existsSync(path.join(mainDir, "redux")))
		fs.mkdir(path.join(mainDir, "redux"), () => {
			if (!fs.existsSync(path.join(mainDir, "redux", "store.js")))
				fs.writeFile(path.join(mainDir, "redux", "store.js"), files.store.content, () => {
					console.log("file created succ")
				})
			if (!fs.existsSync(path.join(mainDir, "redux", "rootReducer.js")))
				fs.writeFile(path.join(mainDir, "redux", "rootReducer.js"), files.rootReducer.content, () => {
					console.log("file created succ")
				})
		})
	return 1
}

const initReducer = async ()=>{
	try{
	const reducerName = await vscode.window.showInputBox({
		title : "Reducer Name",
		placeHolder : "Reducer Name without spaces",
		validateInput : (name)=>{
			if(!name)return "please enter any name!"
			return name.split(" ").length>1?"please don't enter spaces":""
		},
		prompt:"YOU SHOULD IMPORT IT IN ROOT REDUCER!!!"
	})
	if(!initRedux())throw "redux-folder-error"
	fs.mkdirSync(path.join(mainDir,"redux",`${reducerName}`))
	const reducerPath = path.join(mainDir,"redux",`${reducerName}`)
	files.reducerFiles.forEach(item=>{
		fs.writeFileSync(path.join(reducerPath,`${reducerName}${item.name}`),item.content(reducerName))
	})
	}
	catch(e){
		if(e==="redux-folder-error"){
			vscode.window.showErrorMessage("Error when instantiating redux files 🤦‍♂️")
		}
	}


}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let reduxInit = vscode.commands.registerCommand('redux-init.init',initRedux);


	let reducerInit = vscode.commands.registerCommand('redux-init.reducer-init',initReducer)

	context.subscriptions.push(reduxInit);
	context.subscriptions.push(reducerInit);
}










function deactivate() { }







module.exports = {
	activate,
	deactivate
}
