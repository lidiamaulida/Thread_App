import * as joi from "joi"

export const RepliesSchema = joi.object({
    content: joi.string().min(1).max(30).required,
    image: joi.string().allow(null)
})