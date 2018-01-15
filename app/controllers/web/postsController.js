const postsView = (req, res) => {

    res.render('pages/vue/web/posts',  req.locals);
}

module.exports = {
    postsView : postsView
};