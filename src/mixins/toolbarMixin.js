module.exports = {
    methods: {
        toggleLeftSidenav() {
            this.$refs.leftSidenav.toggle();
        },
        transition(path) {
            this.$router.push(path);
        }
    }
};
