import { CheckCircle, Circle, Clock } from "lucide-react";
import { Step } from "../types";

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 h-full overflow-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-100">Build Steps</h2>
      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
              currentStep === step.id
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border border-blue-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => onStepClick(step.id)}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center gap-4">
              {step.status === "completed" ? (
                <CheckCircle className="w-6 h-6 text-green-500 transition-all duration-200" />
              ) : step.status === "in-progress" ? (
                <Clock className="w-6 h-6 text-blue-400 animate-spin" />
              ) : (
                <Circle className="w-6 h-6 text-gray-600" />
              )}
              <h3 className="font-semibold text-lg text-gray-100">
                {step.title}
              </h3>
            </div>
            <p className="text-sm text-gray-300 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
