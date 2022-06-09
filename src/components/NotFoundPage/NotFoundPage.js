import React from "react";
import { Text } from '@mantine/core'

function NotFoundPage() {
    return (
        <Text
            size="xl"
            weight={700}
            color="white"
            className="not-found-page">
            This Page doesn't exist
        </Text>
    )
}
export default NotFoundPage
