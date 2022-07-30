const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const PAGE_SIZE = 3


async function query(filterBy) {
    const { page, pageSize = 3, userId } = filterBy
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('post')
        var posts = (page && pageSize || page === 0)
            ? await collection.find(criteria).sort({ createdAt: -1 }).skip(page * PAGE_SIZE).limit(pageSize).toArray()
            : await collection.find(criteria).sort({ createdAt: -1 }).toArray()
        var count = await collection.find().count()
        // console.log('count', count);
        const results = {
            posts,
            info: {
                maxPage: Math.ceil(count / PAGE_SIZE),
                pageSize: PAGE_SIZE
            }
        }
        return results
    } catch (err) {
        // logger.error('cannot find Posts', err)
        throw err
    }
}

async function getById(postId) {
    try {
        const collection = await dbService.getCollection('post')
        const post = await collection.findOne({ _id: ObjectId(postId) })
        return post
    } catch (err) {
        // logger.error(`while finding post ${postId}`, err)
        throw err
    }
}

async function add(post) {
    try {
        const collection = await dbService.getCollection(
            'post'
        )
        const postId = await collection.insertOne(post)
        const addedPost = await collection.findOne({
            _id: ObjectId(postId.insertedId),
        })
        return addedPost
    } catch (err) {
        logger.error('cannot insert post', err)
        throw err
    }
}

async function update(post) {
    try {
        var id = ObjectId(post._id)
        delete post._id
        const collection = await dbService.getCollection('post')
        await collection.updateOne({ _id: id }, { $set: { ...post } })
        post._id = id
        return post
    } catch (err) {
        // logger.error(`cannot update post ${postId}`, err)
        throw err
    }
}

async function remove(postId) {
    try {
        const collection = await dbService.getCollection('post')
        await collection.deleteOne({ _id: ObjectId(postId) })
        return postId
    } catch (err) {
        // logger.error(`cannot remove post ${postId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    var criteria = {}
    if (filterBy.userId) criteria["by._id"] = filterBy.userId
    return criteria
}

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}