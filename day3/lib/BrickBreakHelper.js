// Überprüft ob ein Block und der Ball sich berühren.
function checkBlockCollision(block, ball, size) {
    const { row, col } = block
    const minX = col * size
    const minY = row * size
    const maxX = minX + size
    const maxY = minY + size

    // 1️⃣ Check if the ball actually overlaps the block
    if (
        ball.x + ball.r < minX || // too far left
        ball.x - ball.r > maxX || // too far right
        ball.y + ball.r < minY || // too far above
        ball.y - ball.r > maxY    // too far below
    ) {
        return null // no collision
    }

    // 2️⃣ Determine which side the collision happened on
    const overlapLeft = ball.x + ball.r - minX
    const overlapRight = maxX - (ball.x - ball.r)
    const overlapTop = ball.y + ball.r - minY
    const overlapBottom = maxY - (ball.y - ball.r)

    // Find the smallest overlap → that’s the collision side
    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom)

    if (minOverlap === overlapLeft) return DIR_LEFT
    if (minOverlap === overlapRight) return DIR_RIGHT
    if (minOverlap === overlapTop) return DIR_UP
    if (minOverlap === overlapBottom) return DIR_DOWN
}


function checkPaddleCollision(paddle, ball, size) {
    const minX = paddle.x - 4 * size
    const minY = paddle.y - size / 2
    const maxX = minX + 8 * size
    const maxY = minY + size

    // 1️⃣ Check if the ball actually overlaps the block
    if (
        ball.x + ball.r < minX || // too far left
        ball.x - ball.r > maxX || // too far right
        ball.y + ball.r < minY || // too far above
        ball.y - ball.r > maxY    // too far below
    ) {
        return null // no collision
    }

    // 2️⃣ Determine which side the collision happened on
    const overlapLeft = ball.x + ball.r - minX
    const overlapRight = maxX - (ball.x - ball.r)
    const overlapTop = ball.y + ball.r - minY
    const overlapBottom = maxY - (ball.y - ball.r)

    // Find the smallest overlap → that’s the collision side
    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom)

    if (minOverlap === overlapLeft) return DIR_LEFT
    if (minOverlap === overlapRight) return DIR_RIGHT
    if (minOverlap === overlapTop) return DIR_UP
    if (minOverlap === overlapBottom) return DIR_DOWN
}