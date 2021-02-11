db.createUser({
    user: "root",
    pwd: "root",
    roles: [
        {
            role: "ReadWrite",
            db: "myDB"
        }
    ]
})