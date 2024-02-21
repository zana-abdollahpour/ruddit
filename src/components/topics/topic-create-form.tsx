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
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={actions.createTopic}>
          <div className="flex w-80 flex-col gap-4 p-4">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              placeholder="Name"
              labelPlacement="outside"
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Describe your topic"
              labelPlacement="outside"
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
