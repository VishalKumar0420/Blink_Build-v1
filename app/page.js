import Hero from "@/components/custom/Hero";
import { Button } from "@/components/ui/button";
import Colors from "@/data/Colors";

export default function Home() {
  return (
   <div className="w-full" style={{backgroundColor:Colors.BACKGROUND}}>
    <Hero/>
   </div>
  );
}
