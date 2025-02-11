"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Sun,
  Moon,
  Monitor,
  RotateCcw,
  Check,
  Palette,
  Type,
  Layout,
} from "lucide-react";

const colorThemes = [
  { value: "blue", label: "Mavi", class: "bg-blue-500" },
  { value: "purple", label: "Mor", class: "bg-purple-500" },
  { value: "green", label: "Yeşil", class: "bg-green-500" },
  { value: "red", label: "Kırmızı", class: "bg-red-500" },
  { value: "orange", label: "Turuncu", class: "bg-orange-500" },
  { value: "yellow", label: "Sarı", class: "bg-yellow-500" },
];

const fontSizes = [
  { value: "sm", label: "Küçük" },
  { value: "md", label: "Orta" },
  { value: "lg", label: "Büyük" },
];

export default function ThemeSettingsPage() {
  const [theme, setTheme] = useState("system");
  const [color, setColor] = useState("blue");
  const [fontSize, setFontSize] = useState("md");
  const [isMenuCollapsible, setIsMenuCollapsible] = useState(true);

  const handleReset = () => {
    setTheme("system");
    setColor("blue");
    setFontSize("md");
    setIsMenuCollapsible(true);
  };

  const handleSave = () => {
    // Tema ayarlarını kaydet
    console.log({
      theme,
      color,
      fontSize,
      isMenuCollapsible,
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tema Ayarları</h1>
          <p className="text-muted-foreground mt-1">
            Panel görünümünü kişiselleştirin
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4" />
            Varsayılan
          </Button>
          <Button className="gap-2" onClick={handleSave}>
            <Check className="h-4 w-4" />
            Kaydet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Tema Modu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="light"
                  id="light"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-2 h-6 w-6" />
                  Açık Mod
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="dark"
                  id="dark"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-2 h-6 w-6" />
                  Koyu Mod
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="system"
                  id="system"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Monitor className="mb-2 h-6 w-6" />
                  Otomatik
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Renk Teması
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={color}
              onValueChange={setColor}
              className="grid grid-cols-3 gap-4"
            >
              {colorThemes.map((colorTheme) => (
                <div key={colorTheme.value}>
                  <RadioGroupItem
                    value={colorTheme.value}
                    id={colorTheme.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={colorTheme.value}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className={`w-6 h-6 rounded-full mb-2 ${colorTheme.class}`} />
                    {colorTheme.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Font Boyutu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger>
                <SelectValue placeholder="Font boyutu seçin" />
              </SelectTrigger>
              <SelectContent>
                {fontSizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Menü Düzeni
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Genişletilebilir Menü</Label>
                <p className="text-sm text-muted-foreground">
                  Menüyü daraltıp genişletebilirsiniz
                </p>
              </div>
              <Switch
                checked={isMenuCollapsible}
                onCheckedChange={setIsMenuCollapsible}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
