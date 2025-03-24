import { mergeProcessors } from "eslint-merge-processors";
import { GLOB_VUE } from "../globs";
import type {
  OptionsFiles,
  OptionsHasTypeScript,
  OptionsOverrides,
  OptionsStylistic,
  OptionsUniapp,
  OptionsVue,
  TypedFlatConfigItem
} from "../types";
import { banImportExtension, interopDefault } from "../utils";

export async function vue(
  options: OptionsVue & OptionsHasTypeScript & OptionsOverrides & OptionsStylistic & OptionsFiles & OptionsUniapp = {}
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_VUE],
    overrides = {},
    stylistic = true,
    uniapp = false,
    vueVersion = 3
  } = options;

  const sfcBlocks = options.sfcBlocks === true
    ? {}
    : options.sfcBlocks ?? {};

  const {
    indent = 2
  } = typeof stylistic === "boolean" ? {} : stylistic;

  const [
    pluginVue,
    parserVue,
    processorVueBlocks
  ] = await Promise.all([
    interopDefault(import("eslint-plugin-vue")),
    interopDefault(import("vue-eslint-parser")),
    interopDefault(import("eslint-processor-vue-blocks"))
  ] as const);

  return [
    {
      // This allows Vue plugin to work with auto imports
      // https://github.com/vuejs/eslint-plugin-vue/pull/2422
      languageOptions: {
        globals: {
          computed: "readonly",
          defineEmits: "readonly",
          defineExpose: "readonly",
          defineProps: "readonly",
          onMounted: "readonly",
          onUnmounted: "readonly",
          reactive: "readonly",
          ref: "readonly",
          shallowReactive: "readonly",
          shallowRef: "readonly",
          toRef: "readonly",
          toRefs: "readonly",
          watch: "readonly",
          watchEffect: "readonly"
        }
      },
      name: "antfu/vue/setup",
      plugins: {
        vue: pluginVue
      }
    },
    {
      files,
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          extraFileExtensions: [".vue"],
          parser: options.typescript
            ? await interopDefault(import("@typescript-eslint/parser")) as any
            : null,
          sourceType: "module"
        }
      },
      name: "antfu/vue/rules",
      processor: sfcBlocks === false
        ? pluginVue.processors[".vue"]
        : mergeProcessors([
            pluginVue.processors[".vue"],
            processorVueBlocks({
              ...sfcBlocks,
              blocks: {
                styles: true,
                ...sfcBlocks.blocks
              }
            })
          ]),
      rules: {
        ...pluginVue.configs.base.rules as any,

        ...vueVersion === 2
          ? {
              ...pluginVue.configs["vue2-essential"].rules as any,
              ...pluginVue.configs["vue2-strongly-recommended"].rules as any,
              ...pluginVue.configs["vue2-recommended"].rules as any
            }
          : {
              ...pluginVue.configs["flat/essential"].map((c) => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}) as any,
              ...pluginVue.configs["flat/strongly-recommended"].map((c) => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}) as any,
              ...pluginVue.configs["flat/recommended"].map((c) => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}) as any
            },

        "antfu/no-top-level-await": "off",
        "node/prefer-global/process": "off",
        "ts/explicit-function-return-type": "off",

        "vue/block-order": ["error", {
          order: ["template", "script:not([setup])", "script[setup]", "style:not([scoped])", "style[scoped]"]
        }],
        "vue/component-name-in-template-casing": ["error", "PascalCase"],
        "vue/component-options-name-casing": ["error", "PascalCase"],
        // this is deprecated
        "vue/component-tags-order": "off",
        "vue/custom-event-name-casing": ["error", "camelCase"],
        "vue/define-macros-order": ["error", {
          order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"]
        }],
        "vue/dot-location": ["error", "property"],
        "vue/dot-notation": ["error", { allowKeywords: true }],
        "vue/eqeqeq": ["error", "smart"],
        "vue/first-attribute-linebreak": ["error", {
          multiline: "below",
          singleline: "beside"
        }],
        "vue/html-closing-bracket-newline": ["error", {
          multiline: "never",
          singleline: "never"
        }],
        "vue/html-indent": ["error", indent],
        "vue/html-quotes": ["error", "double"],
        "vue/html-self-closing": ["error", {
          html: {
            component: "never",
            normal: "never",
            void: "any"
          },
          math: "never",
          svg: "never"
        }],
        "vue/max-attributes-per-line": ["error", {
          multiline: 1,
          singleline: {
            max: 3
          }
        }],
        "vue/multi-word-component-names": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/no-dupe-keys": "off",
        "vue/no-empty-pattern": "error",
        "vue/no-irregular-whitespace": "error",
        "vue/no-loss-of-precision": "error",
        "vue/no-restricted-syntax": [
          "error",
          "DebuggerStatement",
          "LabeledStatement",
          "WithStatement",
          ...banImportExtension("js"),
          ...banImportExtension("mjs"),
          ...banImportExtension("cjs"),
          ...banImportExtension("jsx"),
          ...banImportExtension("ts"),
          ...banImportExtension("mts"),
          ...banImportExtension("cts"),
          ...banImportExtension("tsx")
        ],
        "vue/no-restricted-v-bind": ["error", "/^v-/"],
        "vue/no-setup-props-reactivity-loss": "off",
        "vue/no-sparse-arrays": "error",
        "vue/no-unused-refs": "error",
        "vue/no-useless-v-bind": "error",
        "vue/no-v-html": "off",
        "vue/object-shorthand": [
          "error",
          "always",
          {
            avoidQuotes: true,
            ignoreConstructors: false
          }
        ],
        "vue/prefer-separate-static-class": "error",
        "vue/prefer-template": "error",
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/require-default-prop": "off",
        "vue/require-prop-types": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/space-infix-ops": "error",
        "vue/space-unary-ops": ["error", { nonwords: false, words: true }],

        ...stylistic
          ? {
              "vue/array-bracket-spacing": ["error", "never"],
              "vue/arrow-spacing": ["error", { after: true, before: true }],
              "vue/block-spacing": ["error", "always"],
              "vue/block-tag-newline": ["error", {
                multiline: "always",
                singleline: "always"
              }],
              "vue/brace-style": ["error", "stroustrup", { allowSingleLine: true }],
              "vue/comma-dangle": ["error", "never"],
              "vue/comma-spacing": ["error", { after: true, before: false }],
              "vue/comma-style": ["error", "last"],
              "vue/html-comment-content-spacing": ["error", "always", {
                exceptions: ["-"]
              }],
              "vue/key-spacing": ["error", { afterColon: true, beforeColon: false }],
              "vue/keyword-spacing": ["error", { after: true, before: true }],
              "vue/object-curly-newline": "off",
              "vue/object-curly-spacing": ["error", "always"],
              "vue/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
              "vue/operator-linebreak": ["error", "before"],
              "vue/padding-line-between-blocks": ["error", "always"],
              "vue/quote-props": "off",
              "vue/space-in-parens": ["error", "never"],
              "vue/template-curly-spacing": "error"
            }
          : {},

        ...uniapp
          ? {
              "vue/component-name-in-template-casing": ["error", "kebab-case"]
            }
          : {},

        ...overrides
      }
    }
  ];
}