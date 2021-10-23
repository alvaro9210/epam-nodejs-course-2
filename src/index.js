import express from "express";

const app = express();
const PORT = process.env.PORT || 4200;
const userRouter = express.Router();

const users = [
    {
        id: 1,
        login: 'user1',
        password: 'user1password',
        age: 21,
        isDeleted: false,
    },
    {
        id: 2,
        login: 'user2',
        password: 'user2password',
        age: 22,
        isDeleted: false,
    },
    {
        id: 3,
        login: 'user3',
        password: 'user3password',
        age: 23,
        isDeleted: false,
    },
    {
        id: 4,
        login: 'user4',
        password: 'user4password',
        age: 24,
        isDeleted: false,
    },
    {
        id: 5,
        login: 'user5',
        password: 'user5password',
        age: 25,
        isDeleted: false,
    }
];

// Initial setup
app.listen(3000);
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "I am using babel in NodeJS",
        status: "success",
    });
});

// User router setup
// Main route
userRouter.get('/', (req, res) => {
    res.status(200).json({
        message: 'I am using babel in NodeJS',
        status: 'success',
    });
});

// Get all users
userRouter.get(
    '/users',
    (req, res) => res.json(users.filter(user => !user.isDeleted))
);

// Get a single user
userRouter.get(
    '/user/:id',
    (req, res) => {
        const { id } = req.params;
        return res.json(users.filter(user => user.id == id));
    }
);

app.use('/', userRouter);
app.listen(PORT, () => console.log('server up and running'));
