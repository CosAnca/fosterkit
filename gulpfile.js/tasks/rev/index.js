/* global TASK_CONFIG */
if (!TASK_CONFIG.production.rev) {
  return;
}

const gulp = require("gulp");

const updateHtml = TASK_CONFIG.html ? "update-html" : [];
// If you are familiar with Rails, this task the equivalent of `rake assets:precompile`
function revTask(cb) {
  return gulp.series(
    // 1) Add md5 hashes to assets referenced by CSS and JS files
    "rev-assets",
    // 2) Update asset references (images, fonts, etc) with reved filenames in compiled css + js
    "rev-update-references",
    // 3) Rev and compress CSS and JS files (this is done after assets, so that if a referenced asset hash changes, the parent hash will change as well
    "rev-css",
    // 4) Update asset references in HTML
    updateHtml
  )(cb);
}

revTask.displayName = "rev";
gulp.task(revTask);
module.exports = revTask;
