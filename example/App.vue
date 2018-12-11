<template>
    <div class="j-w">
        <h1 class="t">Solus UX Config</h1>
        <div class="editor-w clearfix">
            <div class="w-2">
                <div class="editor">
                    <JsonEditor :objData="jsonData" v-model="jsonData"></JsonEditor>
                </div>
            </div>
            <div class="w-2">
                <div class="code-pre">
                    <div slot="content">
                        <pre class="pre-code">
                        	<button class="btn btn-copy" @click="doCopy">Copy</button>
							<code class="json" id="res_code"></code>
						</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import hljs from 'highlight.js'
import config from './config.json'

export default {
    name: 'app',
    data: function() {
        return {
            jsonData: config
        }
    },
    watch: {
        'jsonData': function() {
            let c = this.formatJson(JSON.stringify(this.jsonData))
            this.drawResCode(c)
        }
    },

    methods: {
        doCopy: function() {
        	var that = this;
            this.$copyText(JSON.stringify(this.jsonData)).then(function(e) {
                that.$toasted.show('Copied')
            }, function(e) {
            })
        },
        formatJson: function(txt, compress) {
            var indentChar = "  ";
            if (/^\s*$/.test(txt)) {
                return;
            }
            try {
                var data = eval("(" + txt + ")");
            } catch (e) {
                throw (e.description, "err");
                return;
            }
            var draw = [],
                last = false,
                This = this,
                line = compress ? "" : "\n",
                nodeCount = 0,
                maxDepth = 0;

            var notify = function(name, value, isLast, indent, formObj) {
                nodeCount++;
                for (var i = 0, tab = ""; i < indent; i++) tab += indentChar;
                tab = compress ? "" : tab;
                maxDepth = ++indent;
                if (value && value.constructor == Array) {
                    draw.push(
                        tab + (formObj ? '"' + name + '":' : "") + "[" + line
                    );
                    for (var i = 0; i < value.length; i++)
                        notify(i, value[i], i == value.length - 1, indent, false);
                    draw.push(
                        tab + "]" + (isLast ? line : "," + line)
                    );
                } else if (value && typeof value == "object") {
                    draw.push(
                        tab + (formObj ? '"' + name + '":' : "") + "{" + line
                    );
                    var len = 0,
                        i = 0;
                    for (var key in value) len++;
                    for (var key in value) notify(key, value[key], ++i == len, indent, true);
                    draw.push(
                        tab + "}" + (isLast ? line : "," + line)
                    );
                } else {
                    if (typeof value == "string") value = '"' + value + '"';
                    draw.push(
                        tab +
                        (formObj ? '"' + name + '":' : "") +
                        value +
                        (isLast ? "" : ",") +
                        line
                    );
                }
            };
            var isLast = true,
                indent = 0;
            notify("", data, isLast, indent, false);
            return draw.join("");
        },
        drawResCode: function(content) {
            var target = document.getElementById('res_code');
            target.textContent = content
            hljs.highlightBlock(target)
        },
    },
    mounted: function() {
        let c = this.formatJson(JSON.stringify(this.jsonData))
        this.drawResCode(c)
    }
}
</script>
<style>
@import url('../node_modules/highlight.js/styles/github.css');
@import url('./app.css')
</style>