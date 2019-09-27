export default class {
    constructor ({ uid, title, slide, video }) {
        this.uid = uid;
        this.title = title;
        this.slide = slide;
        this.video = video;
        this.fileName = new Date().getTime().toString(16);
    }  
}