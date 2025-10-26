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
import Link from "next/link";
import useChildPairingHook from "../_hooks/useChildPairing";
import { validationChildPairingSchema } from "../_schemas/PairingChildSchema";

const ChildPairingCard = () => {
  const { childPairingMutation } = useChildPairingHook();

  const formik = useFormik({
    initialValues: { childCode: "", pin: "" },
    validationSchema: validationChildPairingSchema,
    onSubmit: (values) => childPairingMutation.mutate(values),
  });

  const pending = childPairingMutation.isPending;
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">CHILD PAIRING</CardTitle>
            <CardDescription className="text-center">
              Enter your code and pin below to pair
            </CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="childCode">Child Code</Label>
                  <Input
                    id="childCode"
                    type="text"
                    placeholder="Child Code"
                    disabled={pending}
                    {...formik.getFieldProps("childCode")}
                  />
                  {formik.touched.childCode && formik.errors.childCode && (
                    <p className="text-xs text-destructive">
                      {formik.errors.childCode}
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
                      "Pair"
                    )}
                  </Button>
                </div>

                <div className="grid gap-5">
                  <p className="text-sm text-center">
                    Already connect to your parent?{" "}
                    <Link href="/login">{"Login Here"}</Link>
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

export default ChildPairingCard;
