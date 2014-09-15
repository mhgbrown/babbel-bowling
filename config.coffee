exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.
  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
      order:
        before: [
          'vendor/scripts/console-helper.js'
        ]

    stylesheets:
      defaultExtension: 'styl'
      joinTo: 'stylesheets/app.css'
      order:
        before: ['vendor/styles/normalize.css']
        after: ['vendor/styles/helpers.css']

    templates:
      defaultExtension: 'hbs'
      joinTo: 'javascripts/app.js'

  plugins:
    autoReload:
      enabled:
        js: on
        css: on
        assets: off
    imageoptimizer:
      path: 'images'
      smushit: no
