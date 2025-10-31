"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useFormik } from "formik";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import useChildLoginHook from "../_hooks/useChildLogin";
import { validationChildLoginSchema } from "../_schemas/LoginChildSchema";
import Link from "next/link";

const ChildLoginCard = () => {
  const { childLoginMutation } = useChildLoginHook();

  const formik = useFormik({
    initialValues: { familyCode: "", pin: "" },
    validationSchema: validationChildLoginSchema,
    onSubmit: (values) => childLoginMutation.mutate(values),
  });

  const pending = childLoginMutation.isPending;
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">CHILD LOGIN</CardTitle>
            <CardDescription className="text-center">
              Enter your code and pin below to login
            </CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="familyCode">Family Code</Label>
                  <Input
                    id="familyCode"
                    type="text"
                    placeholder="Family Code"
                    disabled={pending}
                    {...formik.getFieldProps("familyCode")}
                  />
                  {formik.touched.familyCode && formik.errors.familyCode && (
                    <p className="text-xs text-destructive">
                      {formik.errors.familyCode}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pin">Pin</Label>
                  <InputOTP
                    maxLength={6}
                    className="w-full"
                    value={formik.values.pin}
                    onChange={(val) => formik.setFieldValue("pin", val)}
                    onBlur={() => formik.setFieldTouched("pin", true)}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {formik.touched.pin && formik.errors.pin && (
                    <p className="text-xs text-destructive">
                      {formik.errors.pin}
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
                      "Login"
                    )}
                  </Button>
                </div>

                <div className="grid gap-5">
                  <p className="text-sm text-center">
                    Haven&apos;t connect to your parent?{" "}
                    <Link href="/child/pairing">{"Connect Here"}</Link>
                  </p>
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

export default ChildLoginCard;
