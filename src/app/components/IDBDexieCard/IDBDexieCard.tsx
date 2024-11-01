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

import { db, IDB_STORE_ID } from "./db";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
})

export default function IDBDexieCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
 
  function onSubmit({ title }: z.infer<typeof formSchema>) {
    db[IDB_STORE_ID].add({
      id: uuid(),
      title,
    });
    form.reset();
  }

  return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Dexie IndexedDB</CardTitle>
          <CardDescription>This example uses the Dexie library (31KB). It has an IDB observable and good TS support.</CardDescription>
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
