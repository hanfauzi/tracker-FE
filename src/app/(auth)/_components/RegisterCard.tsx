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
import useRegisterHook from "../_hooks/useParentRegister";
import { validationParentRegisterSchema } from "../_schemas/RegisterSchema";
import { Spinner } from "@/components/ui/spinner";

const RegisterCard = () => {
  const { registerParentMutation } = useRegisterHook();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationParentRegisterSchema,
    onSubmit: (values) => registerParentMutation.mutate(values),
  });

  const pending = registerParentMutation.isPending;
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">REGISTER</CardTitle>
            <CardDescription className="text-center">
              Enter your email below to register
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-xs text-destructive">
                    {formik.errors.email}
                  </p>
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

export default RegisterCard;
