"use client";

import { Input } from "@/components/ui/input";
import useCreateChildHook from "../_hooks/useCreateChild";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { validationCreateChildSchema } from "../_schema/CreateChildSchema";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

const CreateChild = () => {
  const { createChildMutation } = useCreateChildHook();

  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: validationCreateChildSchema,
    onSubmit: (values) => createChildMutation.mutate(values),
  });

  const pending = createChildMutation.isPending;
  return (
    <>
      <div className="h-full w-full">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid w-full items-start gap-3">
            <Label htmlFor="Name">Name</Label>
            <Input
              id="name"
              type="name"
              placeholder="Name"
              disabled={pending}
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-destructive">{formik.errors.name}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Button type="submit" variant="outline" disabled={pending}>
              {pending ? (
                <span className="inline-flex items-center gap-2">
                  {" "}
                  <Spinner className="animate-spin" />
                </span>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateChild;
