export const indexPage = (req, res, next) => {
    res.render('layout', {content: 'index', title: 'To-Do List'})
}

export const signInPage = (req, res, next) => {
    res.render('layout', {content: 'signin', title: 'To-Do List'})
}

export const registerPage = (req, res, next) => {
    res.render('layout', {content: 'register', title: 'To-Do List'})
}