let editor;

require.config({
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs"
    }
});

require(["vs/editor/editor.main"], function () {

    monaco.languages.register({
        id: "lua",
        extensions: [".lua"],
        aliases: ["Lua"]
    });


    editor = monaco.editor.create(
        document.getElementById("editor"),
        {
            value:
`-- Roblox Luau Example

local part = Instance.new("Part")

part.Parent = workspace

print("Hello Roblox!")
`,
            language: "lua",
            theme: "vs-dark",
            automaticLayout: true,
            fontSize: 15,
            minimap: {
                enabled: true
            }
        }
    );

});
