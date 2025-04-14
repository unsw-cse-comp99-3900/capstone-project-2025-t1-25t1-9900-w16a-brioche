/**
 * @file FileUploadLight.tsx - A lightweight file upload component with drag-and-drop support.
 *
 * This component allows users to upload files by clicking or dragging into a styled area.
 * It uses `react-dropzone` for drop handling and shows file previews after upload.
 * The `GridPattern` background adds a subtle visual texture.
 */

import { useRef, useState, memo } from "react"
import { cn } from "@/lib/utils"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"

/**
 * GridPattern Component
 *
 * Renders a decorative grid background made of square blocks.
 * This component is memoized for performance, as it does not change over time.
 *
 * @returns {JSX.Element} A static visual background pattern.
 */
const GridPattern = memo(() => {
  const columns = 41
  const rows = 11
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          )
        })
      )}
    </div>
  )
})
GridPattern.displayName = "GridPattern"

/**
 * FileUploadLight Component
 *
 * Provides a simple UI for uploading a single file via drag-and-drop or file input.
 * Includes previews of uploaded files with metadata (size, type, modified date).
 *
 * @param {Function} onChange - Optional callback triggered when a new file is selected.
 * @returns {JSX.Element} A file upload container with visual feedback and file info.
 */
export const FileUploadLight = memo(
  ({ onChange }: { onChange?: (files: File[]) => void }) => {
    const [files, setFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Handles manual file input (click-based) and updates the file list.
    const handleFileChange = (newFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(newFiles)
    }

    // Opens the hidden file input when the user clicks the container.
    const handleClick = () => {
      fileInputRef.current?.click()
    }

    // `useDropzone` provides drag-and-drop behavior without triggering file input click
    const { getRootProps, isDragActive } = useDropzone({
      multiple: false,
      noClick: true,
      onDrop: handleFileChange,
      onDropRejected: (error) => {
        console.log(error)
      },
    })

    return (
      <div className="w-full" {...getRootProps()}>
        <div
          onClick={handleClick}
          className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
        >
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
            className="hidden"
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
              Drag or drop your files here or click to upload
            </p>
            <div className="relative w-full mt-10 max-w-xl mx-auto">
              {files.length > 0 &&
                files.map((file, idx) => (
                  <div
                    key={"file" + idx}
                    className={cn(
                      "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                      "shadow-sm animate-in fade-in-0 duration-300"
                    )}
                  >
                    <div className="flex justify-between w-full items-center gap-4">
                      <p className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                        {file.name}
                      </p>
                      <p className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                      <p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                        {file.type}
                      </p>

                      <p className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                        modified{" "}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              {!files.length && (
                <div
                  className={cn(
                    "relative group-hover/file:translate-x-5 group-hover/file:-translate-y-5 group-hover/file:opacity-90 transition-all duration-300 z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)] group-hover/file:shadow-2xl"
                  )}
                >
                  {isDragActive ? (
                    <p className="text-neutral-600 flex flex-col items-center opacity-0 animate-in fade-in-0 duration-300">
                      Drop it
                      <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </p>
                  ) : (
                    <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                  )}
                </div>
              )}

              {!files.length && (
                <div className="absolute opacity-0 group-hover/file:opacity-100 transition-opacity duration-300 border border-dashed border-purple-600 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
FileUploadLight.displayName = "FileUploadLight"

export default FileUploadLight
