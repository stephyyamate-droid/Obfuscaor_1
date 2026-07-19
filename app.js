// =======================================
// Lua Studio - app.js
// Monaco Editor + Lua Language + Runner
// =======================================


let editor;


// =======================================
// Load Monaco Editor
// =======================================

require.config({
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs"
    }
});


require(["vs/editor/editor.main"], function () {


    // ===================================
    // Register Lua Language
    // ===================================

    monaco.languages.register({
        id: "lua",
        extensions: [".lua"],
        aliases: ["Lua", "lua"]
    });



    // ===================================
    // Lua Syntax Highlighting
    // ===================================

    monaco.languages.setMonarchTokensProvider("lua", {

        keywords: [
            "and",
            "break",
            "do",
            "else",
            "elseif",
            "end",
            "false",
            "for",
            "function",
            "goto",
            "if",
            "in",
            "local",
            "nil",
            "not",
            "or",
            "repeat",
            "return",
            "then",
            "true",
            "until",
            "while"
        ],


        tokenizer: {


            root: [

                // Comments
                [
                    /--.*$/,
                    "comment"
                ],


                // Strings
                [
                    /"(?:[^"\\]|\\.)*"/,
                    "string"
                ],

                [
                    /'(?:[^'\\]|\\.)*'/,
                    "string"
                ],


                // Numbers
                [
                    /\b\d+(\.\d+)?\b/,
                    "number"
                ],


                // Keywords
                [
                    /[a-zA-Z_]\w*/,
                    {
                        cases: {
                            "@keywords": "keyword",
                            "@default": "identifier"
                        }
                    }
                ],


                // Operators
                [
                    /[=+\-*\/%^<>~]/,
                    "operator"
                ],


                // Brackets
                [
                    /[\(\)\[\]\{\}]/,
                    "@brackets"
                ]

            ]

        }

    });



    // ===================================
    // Create Editor
    // ===================================


    editor = monaco.editor.create(
        document.getElementById("editor"),
        {

            value:
`-- Lua Playground

local message = "Hello Lua!"

print(message)


for i = 1, 5 do
    print(i)
end
`,

            language: "lua",

            theme: "vs-dark",

            fontSize: 15,

            automaticLayout: true,


            minimap: {
                enabled: true
            },


            lineNumbers: "on",

            roundedSelection: false,

            scrollBeyondLastLine: false

        }
    );



    // Load saved code

    let saved =
    localStorage.getItem("lua-code");


    if(saved){

        editor.setValue(saved);

    }


});




// =======================================
// Run Lua Code
// =======================================


function runLua(){


    let output =
    document.getElementById("output");


    output.textContent = "";



    let code =
    editor.getValue();



    // Save code

    localStorage.setItem(
        "lua-code",
        code
    );



    let oldPrint =
    console.log;



    console.log = function(...args){

        output.textContent +=
        args.join(" ") + "\n";

    };



    try{


        // Run Lua

        fengari.load(code)();


    }


    catch(error){


        output.textContent +=
        "Lua Error:\n" +
        error;


    }



    console.log = oldPrint;


}




// =======================================
// Run Button
// =======================================

document
.getElementById("run")
.addEventListener(
"click",
runLua
);




// =======================================
// Ctrl + Enter Shortcut
// =======================================

document.addEventListener(
"keydown",
function(event){


    if(
        event.ctrlKey &&
        event.key === "Enter"
    ){

        runLua();

    }


});




// =======================================
// Autosave
// =======================================

setInterval(()=>{


    if(editor){


        localStorage.setItem(
            "lua-code",
            editor.getValue()
        );


    }


},2000);
