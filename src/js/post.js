export default class Post{
    constructor(title, logo) {
        this.title = title;
        this.logo = logo;
    }

    toString() {
        return JSON.stringify({
            title: this.title,
            logo: this.logo
        })
    }
}