"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
    email: zod_1.z.string().email("Invalid email format"),
    age: zod_1.z.number().min(18, "Age must be 18 or above"),
});
const userData = { name: "PK", email: "pk@example.com", age: 17 };
const result = userSchema.safeParse(userData);
if (!result.success) {
    console.log(result.error.format()); // Shows validation errors
}
