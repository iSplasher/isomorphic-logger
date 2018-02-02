const {
  exec,
  build,
  cd,
  lifecycle,
  isPushEventBuild,
  gitPush,
  npmPublish,
  resolveNpmTag
} = require('@grabrinc/grabr-build-tools');

build({
  ...lifecycle,
  publish() {
    if (isPushEventBuild()) {
      gitPush();
      const dir = './target/out';
      const curDir = process.cwd();
      if (dir) {
        exec('echo "copying "');
        exec(`cp README.md LICENSE package.json ${dir}`);
        cd(dir);
        exec('echo "changed directory"');
      }
      exec("echo '=========== current dir'")
      exec('ls -la');
      exec(`npm publish --tag=${resolveNpmTag()}`);
      cd(curDir);
    }
  }
});
