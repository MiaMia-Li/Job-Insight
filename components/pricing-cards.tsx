import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

const pricingPlans = [
  {
    name: "基础套餐",
    credits: 30,
    price: "¥99",
    description: "适合个人用户或小型项目",
    popular: false,
  },
  {
    name: "专业套餐",
    credits: 100,
    price: "¥299",
    description: "适合中型企业或成长中的团队",
    popular: true,
  },
  {
    name: "企业套餐",
    credits: 200,
    price: "¥499",
    description: "适合大型企业或高需求用户",
    popular: false,
  },
];

export default function PricingCards() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-center">
          Buy <span className="text-cyan-500">InsightfulCV</span> Credits
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-500 sm:mb-10">
          You have <span className="text-cyan-500 font-semibold">1 credit</span>
          . Join thousands of happy customers by buying more below.
        </p>
        {/* <p className="text-sm text-muted-foreground mt-2">
          Optimize your resume with AI-powered conversations
        </p> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col h-full ${
              plan.popular ? "border-primary shadow-lg" : ""
            }`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <Badge>{plan.credits}</Badge>
                {/* {plan.name}
                {plan.popular && (
                  <Badge variant="secondary">Most Popular</Badge>
                )} */}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-4xl font-bold mb-2">{plan.price}</div>
              <div className="text-muted-foreground">
                {plan.credits} credits
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                variant={plan.popular ? "default" : "outline"}>
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
