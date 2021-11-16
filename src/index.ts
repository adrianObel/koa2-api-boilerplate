if(process.env.NODE_ENV != "development") {
    console.log = () => {}
}

require('./bin')