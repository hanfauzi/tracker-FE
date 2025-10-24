"use client";
import { useFormik } from "formik";
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
import useParentLoginHook from "../_hooks/useParentLogin";
import { validationParentLoginSchema } from "../_schemas/LoginParentSchema";

const ParentLoginCard = () => {
  const { loginParentMutation } = useParentLoginHook();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationParentLoginSchema,
    onSubmit: (values) => loginParentMutation.mutate(values),
  });

  console.log(formik.touched);

  const pending = loginParentMutation.isPending;
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">PARENT LOGIN</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password below to login
            </CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    disabled={pending}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-destructive">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
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

export default ParentLoginCard;
