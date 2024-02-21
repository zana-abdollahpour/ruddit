"use client";

import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

import * as actions from "@/actions";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex w-80 flex-col gap-4 p-4">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              placeholder="Name"
              labelPlacement="outside"
              isInvalid={!!formState.errors.name}
              errorMessage={!!formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Describe your topic"
              labelPlacement="outside"
              isInvalid={!!formState.errors.description}
              errorMessage={!!formState.errors.description?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="rounded-lg border border-red-400 bg-red-200 p-2">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
