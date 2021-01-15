const mongoose = require("mongoose")
const cities = require("./cities")
const {places, descriptors} = require("./seedHelpers")
const Campground = require("../models/campground")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "Connection error:"))
db.once("open", () => {
    console.log("Database connected!")
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany()
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) +10
        const camp = new Campground({
            author: '5ff8b717eb8f795ba0aa2967',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,            
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
          },
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/djpzrwa9f/image/upload/v1610407670/YelpCamp/agmghgplwyqwdk1dx51y.jpg',
                  filename: 'YelpCamp/agmghgplwyqwdk1dx51y'
                },
                {
                  
                  url: 'https://res.cloudinary.com/djpzrwa9f/image/upload/v1610407670/YelpCamp/j1mhgzqmsw8qjibgke76.jpg',
                  filename: 'YelpCamp/j1mhgzqmsw8qjibgke76'
                },
                {
                  
                  url: 'https://res.cloudinary.com/djpzrwa9f/image/upload/v1610407670/YelpCamp/cubrcf7bnd3hy51jtiex.jpg',
                  filename: 'YelpCamp/cubrcf7bnd3hy51jtiex'
                },
                {
                  
                  url: 'https://res.cloudinary.com/djpzrwa9f/image/upload/v1610407670/YelpCamp/r60lwehrlpcxoaoiaepl.jpg',
                  filename: 'YelpCamp/r60lwehrlpcxoaoiaepl'
                }
              ]
        })
        await camp.save()
    }
    // const c = new Campground({title: "Purple Field"})
    // await c.save()
}

seedDB().then(() => {
    mongoose.connection.close()
})