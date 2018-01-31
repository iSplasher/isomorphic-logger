const {build, lifecycle} = require('@grabrinc/grabr-build-tools');

build({
  ...lifecycle,
  publish() {
    console.info('>>>>>>>>>> publishing')
  }
});
