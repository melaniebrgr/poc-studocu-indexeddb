"use client"

import { z } from "zod"
import { v4 as uuid } from "uuid"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { useIDB, getTransaction } from "./useIDB";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
})

export default function IDBVanillaCard() {
  const { db } = useIDB();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
 
  function onSubmit({ title }: z.infer<typeof formSchema>) {
    try {
      const txReadWrite = getTransaction(db, 'readwrite');
      txReadWrite?.add({
        id: uuid(),
        title,
      });
      form.reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Vanilla JS IndexedDB</CardTitle>
          <CardDescription>This example uses the raw IndexedDB API.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My magic summary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
