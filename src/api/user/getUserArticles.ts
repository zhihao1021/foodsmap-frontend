import { Article } from "@/schemas/article";

export default async function getUserArticles(userId: string): Promise<Article[]> {

    return [
        {
            id: "1",
            title: "Sample Article 1 title",
            context: "This is a sample article content.",
            like: 10,
            tags: ["sample", "article"],
            author: userId,
            date: Date.now(),
            mediaURL: [
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
            ],
            googleMapURL:"https://maps.app.goo.gl/q28bLHwftxuoJ86n8"
        },

        {
            id: "2",
            title: "Sample Article 2 title",
            context: "This is a sample article content."
                + "This is a sample article content."
                + "This is a sample article content."
                + "This is a sample article content.",
            like: 10,
            tags: ["sample", "article"],
            author: userId,
            date: Date.now(),
            mediaURL: [
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQByhyzfBj-RmzYDX2wsroaMnd5hwmk0uo6VDzREHVt_Pl8IzB5gdO7ihkFooOG3AUnLYw&usqp=CAU",
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXZylLZLdEOnpA7xCFv_tEqFvcThCY70wK7Q&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzrKe4K6ksJyAxWNZaZnBusYATav4bgA8TPw&s"
            ],
            googleMapURL: "https://maps.app.goo.gl/3wjdbnX3DVTNZi7v7"

        },
        {
            id: "3",
            title: "Sample Article 3 title",
            context: "This is a sample article content.",
            like: 10,
            tags: ["sample", "article"],
            author: userId,
            date: Date.now(),
            mediaURL: [
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
            ],
            googleMapURL: "https://maps.app.goo.gl/7jXRTiEAAZdfciLW9"
        }


    ]
}