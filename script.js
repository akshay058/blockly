var toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "CATEGORY",
      name: "Logic",
      colour: "%{BKY_LOGIC_HUE}",
      contents: [
        {
          kind: "BLOCK",
          type: "controls_if",
        },
        {
          kind: "BLOCK",
          type: "logic_compare",
        },
        {
          kind: "BLOCK",
          type: "logic_operation",
        },
        {
          kind: "BLOCK",
          type: "logic_negate",
        },
        {
          kind: "BLOCK",
          type: "logic_boolean",
        },
      ],
    },
    {
      kind: "CATEGORY",
      name: "Loops",
      colour: "%{BKY_LOOPS_HUE}",
      contents: [
        {
          kind: "BLOCK",
          type: "controls_repeat_ext",
          inputs: {
            TIMES: {
              shadow: {
                type: "math_number",
                fields: { NUM: 10 },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "controls_whileUntil",
        },
      ],
    },
    {
      kind: "CATEGORY",
      name: "Math",
      colour: "%{BKY_MATH_HUE}",
      contents: [
        {
          kind: "BLOCK",
          type: "math_number",
        },
        {
          kind: "BLOCK",
          type: "math_arithmetic",
          inputs: {
            A: {
              shadow: {
                type: "math_number",
                fields: { NUM: 1 },
              },
            },
            B: {
              shadow: {
                type: "math_number",
                fields: { NUM: 1 },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "math_single",
          inputs: {
            NUM: {
              shadow: {
                type: "math_number",
                fields: { NUM: 9 },
              },
            },
          },
        },
      ],
    },
    {
      kind: "CATEGORY",
      name: "Text",
      colour: "%{BKY_TEXTS_HUE}",
      contents: [
        {
          kind: "BLOCK",
          type: "text",
        },
        {
          kind: "BLOCK",
          type: "text_length",
          inputs: {
            VALUE: {
              shadow: {
                type: "text",
                fields: { TEXT: "abc" },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_print",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: { TEXT: "abc" },
              },
            },
          },
        },
        {
          kind: "BLOCK",
          type: "text_prompt_ext",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: { TEXT: "abc" },
              },
            },
          },
        },
      ],
    },
    {
      kind: "SEP",
    },
    {
      kind: "CATEGORY",
      name: "Variables",
      custom: "VARIABLE",
      colour: "%{BKY_VARIABLES_HUE}",
    },
    {
      kind: "CATEGORY",
      name: "Functions",
      custom: "PROCEDURE",
      colour: "%{BKY_PROCEDURES_HUE}",
    },
  ],
};

var demoWorkspace = Blockly.inject("blocklyDiv", {
  media: "./node_modules/blockly/media/",
  toolbox: toolbox,
});

var startBlocks = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: "controls_if",
        inline: false,
        extraState: {
          hasElse: true,
        },
        inputs: {
          IF0: {
            block: {
              type: "logic_compare",
              fields: {
                OP: "EQ",
              },
              inputs: {
                A: {
                  block: {
                    type: "math_arithmetic",
                    fields: {
                      OP: "MULTIPLY",
                    },
                    inputs: {
                      A: {
                        block: {
                          type: "math_number",
                          fields: {
                            NUM: 6,
                          },
                        },
                      },
                      B: {
                        block: {
                          type: "math_number",
                          fields: {
                            NUM: 7,
                          },
                        },
                      },
                    },
                  },
                },
                B: {
                  block: {
                    type: "math_number",
                    fields: {
                      NUM: 42,
                    },
                  },
                },
              },
            },
          },
          DO0: {
            block: {
              type: "text_print",
              inline: false,
              inputs: {
                TEXT: {
                  block: {
                    type: "text",
                    fields: {
                      TEXT: "Don't panic",
                    },
                  },
                },
              },
            },
          },
          ELSE: {
            block: {
              type: "text_print",
              inline: false,
              inputs: {
                TEXT: {
                  block: {
                    type: "text",
                    fields: {
                      TEXT: "Panic",
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
};
Blockly.serialization.workspaces.load(startBlocks, demoWorkspace);

function onchange(event) {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  document.getElementById("output").innerText = code;
}

demoWorkspace.addChangeListener(onchange);
onchange();

function runCode() {
  // Generate JavaScript code and run it.
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP =
    'if (--window.LoopTrap < 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}
