exports.posts = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First post', content: 'This is the first post!' }]
    });
};

// This the data format to send externally from any place to interact with api.
// postButton.addEventListener('click', () => {
//     fetch('http://localhost:8080/feed/post', {
//         method: 'POST',
//         body: JSON.stringify({ // this is for sending data in json format
//             title: "Test title form external place",
//             content: "Title content from external place"
//         }),
//         headers: { // this is for browser to understand the data format
//             'Content-Type': 'application/json'
//         }
//     })
//     .then()
//     .catch(err => console.log(err))
// });

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    // Create post in DB

    res.status(201).json({ // 200 is for success only but 201 means success and create
        message: "Post created successfully",
        post: { id: new Date().toISOString, title: title, content: content }
    })
};