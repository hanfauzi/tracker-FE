"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import useSetPasswordHook from "../_hooks/useParentSetPassword";
import { useFormik } from "formik";
import { validationParentSetPasswordSchema } from "../_schemas/SetPasswordSchema";

const SetPasswordCard = () => {
  const { setPasswordMutation } = useSetPasswordHook();

  const formik = useFormik({
    initialValues: { name: "", phoneNumber: "", password: "" },
    validationSchema: validationParentSetPasswordSchema,
    onSubmit: (values) => {
      setPasswordMutation.mutate(values);
    },
  });

  const pending = setPasswordMutation.isPending;
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">SET PASSWORD</CardTitle>
            <CardDescription className="text-center">
              Fill to set your account
            </CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder="Name"
                    disabled={pending}
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-xs text-destructive">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Phone Number">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="phoneNumber"
                    placeholder="08**********"
                    disabled={pending}
                    {...formik.getFieldProps("phoneNumber")}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="text-xs text-destructive">
                      {formik.errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    disabled={pending}
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-xs text-destructive">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? (
                      <span className="inline-flex items-center gap-2">
                        {" "}
                        <Spinner className="animate-spin" />
                      </span>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2"></CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SetPasswordCard;
