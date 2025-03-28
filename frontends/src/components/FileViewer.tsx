import { X } from "lucide-react";
import { FileViewerProps } from "../types";

export function FileViewer({ file, onClose }: FileViewerProps) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-6 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-xl transform transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-gray-100 truncate">
            {file.path}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            aria-label="Close File Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[calc(80vh-4rem)]">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-words overflow-auto">
            {file.content || "No content available"}
          </pre>
        </div>
      </div>
    </div>
  );
}
