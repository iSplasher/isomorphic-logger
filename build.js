const {
  exec,
  build,
  lifecycle,
  isPushEventBuild,
  gitPush,
  npmPublish,
  resolveNpmTag
} = require('@grabrinc/grabr-build-tools');

build({
  ...lifecycle,
  publish() {
    exec("echo 'publish begin'")
    if (isPushEventBuild()) {
      exec("echo 'push event!'");
      exec("ls -la")
      exec("echo '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'");
      exec("ls -la ./target/out");
      //gitPush();
      //npmPublish(resolveNpmTag(), './target/out');
    }
  }
});
