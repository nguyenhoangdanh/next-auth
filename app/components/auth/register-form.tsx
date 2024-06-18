"use client"
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { login } from '@/actions/login';
import { RegisterSchema } from '@/schemas';
import { register } from '@/actions/register';
const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("")
        startTransition(() => {
            register(values)
                .then((data) => {
                    setSuccess(data?.success);
                    setError(data?.error)
                })
        })
    }

    return (
        <CardWrapper
            headerLabel='Create an account'
            backButtonLabel='Already have an account!'
            backButtonHref='/auth/login'
            showSocial
        >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="admin"
                                            type='text'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="admin@example.com"
                                            type='email'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="********"
                                            type='password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type='submit'
                        className='w-full'
                    >
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default RegisterForm;