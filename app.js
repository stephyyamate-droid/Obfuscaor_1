// ===============================
// Lua Studio - app.js
// Monaco Editor + Lua Runtime
// ===============================


let editor;


// Load Monaco Editor

require.config({
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs"
    }
});


require(["vs/editor/editor.main"], function () {


    // Create Lua language

    monaco.languages.register({
        id: "lua"
    });


    // Basic Lua syntax highlighting

    monaco.languages.setMonarchTokensProvider("lua", {

        tokenizer: {

            root: [

                [/\b(local|function|end|if|then|else|for|while|do|return|and|or|not)\b/, "keyword"],

                [/"[^"]*"/, "string"],

                [/'[^']*'/, "string"],

                [/--.*/, "comment"],

                [/\b\d+\b/, "number"],

                [/[a-zA-Z_]\w*/, "identifier"]

            ]

        }

    });



    // Create editor

    editor = monaco.editor.create(
        document.getElementById("editor"),
        {

            value:
`-- Lua Studio

print("Hello from Lua!")

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

            lineNumbers: "on"

        }
    );


});



// ===============================
// Run Lua
// ===============================


document.getElementById("run").onclick = function(){


    let code = editor.getValue();


    let output = document.getElementById("output");


    output.textContent = "";



    // Save old console

    let oldLog = console.log;



    console.log = function(...args){

        output.textContent += args.join(" ") + "\n";

    };



    try {


        // Execute Lua

        fengari.load(code)();


    }


    catch(error){

        output.textContent +=
        "Lua Error:\n" + error;


    }



    // Restore console

    console.log = oldLog;


};



// ===============================
// Ctrl + Enter = Run
// ===============================


document.addEventListener(
"keydown",
function(e){

    if(e.ctrlKey && e.key === "Enter"){

        document.getElementById("run").click();

    }

});



// ===============================
// Autosave
// ===============================


setInterval(()=>{

    if(editor){

        localStorage.setItem(
            "lua-code",
            editor.getValue()
        );

    }

},1000);



// Load saved code

window.addEventListener(
"load",
()=>{

    let saved =
    localStorage.getItem("lua-code");


    if(saved && editor){

        editor.setValue(saved);

    }

});
