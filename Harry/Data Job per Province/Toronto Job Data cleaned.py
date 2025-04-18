
import pandas as pd

# Load the CSV
df = pd.read_csv("Toronto Job Data.csv")

# Drop unnecessary or completely empty columns
columns_to_drop = [
    'DGUID', 'UOM_ID', 'SCALAR_FACTOR', 'SCALAR_ID', 'VECTOR',
    'COORDINATE', 'STATUS', 'SYMBOL', 'TERMINATED', 'DECIMALS'
]
df_cleaned = df.drop(columns=columns_to_drop)

# Optional: Rename 'VALUE' to something more readable
df_cleaned = df_cleaned.rename(columns={'VALUE': 'Employment Count (Thousands)'})

# Preview the cleaned data
print(df_cleaned.head())

# Save to a new CSV
df_cleaned.to_csv("Cleaned_Toronto_Job_Data.csv", index=False)
