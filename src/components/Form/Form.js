import React, { useState } from 'react';
import { TextInput, Checkbox, Button, Group, Box, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import './Form.scss'

function Form() {
    const form = useForm({
        initialValues: {
            email: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const [response, setResponse] = useState(null)

    const submitForm = () => {
        setResponse('We will contact you')
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto" className='box'>
            {response && <Text color="white">{response}</Text>}

            <form onSubmit={form.onSubmit((values) => submitForm(values))}>
                <TextInput
                    required
                    label="Join Our Club"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />

                <Checkbox
                    mt="md"
                    color="gray"
                    radius="xs"
                    label="I agree to sell my privacy"
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />

                <Group position='center' mt="md">
                    <Button className='formBtn' color="gray" radius="xs" size="md" type="submit">Submit</Button>
                </Group>
            </form>
        </Box >
    );
}
export default Form