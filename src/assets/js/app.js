$(() => {
  // anchor-js
  anchors.options.visible = 'always';
  anchors.add();

  // highlight.js
  hljs.configure({
    languages: ['ruby', 'html', 'bash']
  });
  hljs.highlightAll();
});
