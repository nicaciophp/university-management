db = db.getSiblingDB('university')

db.createUser(
    {
        user: "user",
        pwd: "user",
        roles: [
            {
                role: "readWrite",
                db: "university"
            }
        ]
    }
);