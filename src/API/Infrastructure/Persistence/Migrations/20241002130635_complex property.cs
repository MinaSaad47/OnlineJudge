using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineJudge.API.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class complexproperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusRepresentation_Discriminator",
                table: "Submissions");

            migrationBuilder.RenameColumn(
                name: "StatusRepresentation_Output",
                table: "Submissions",
                newName: "Status_TestCase_Output");

            migrationBuilder.RenameColumn(
                name: "StatusRepresentation_Key",
                table: "Submissions",
                newName: "Status_TestCase_Key");

            migrationBuilder.RenameColumn(
                name: "StatusRepresentation_Input",
                table: "Submissions",
                newName: "Status_TestCase_Input");

            migrationBuilder.RenameColumn(
                name: "StatusRepresentation_Error",
                table: "Submissions",
                newName: "Status_Error");

            migrationBuilder.RenameColumn(
                name: "StatusRepresentation_ActualOutput",
                table: "Submissions",
                newName: "Status_ActualOutput");

            migrationBuilder.AddColumn<int>(
                name: "Status_Kind",
                table: "Submissions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Status_TestCase_IsSample",
                table: "Submissions",
                type: "boolean",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status_Kind",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Status_TestCase_IsSample",
                table: "Submissions");

            migrationBuilder.RenameColumn(
                name: "Status_TestCase_Output",
                table: "Submissions",
                newName: "StatusRepresentation_Output");

            migrationBuilder.RenameColumn(
                name: "Status_TestCase_Key",
                table: "Submissions",
                newName: "StatusRepresentation_Key");

            migrationBuilder.RenameColumn(
                name: "Status_TestCase_Input",
                table: "Submissions",
                newName: "StatusRepresentation_Input");

            migrationBuilder.RenameColumn(
                name: "Status_Error",
                table: "Submissions",
                newName: "StatusRepresentation_Error");

            migrationBuilder.RenameColumn(
                name: "Status_ActualOutput",
                table: "Submissions",
                newName: "StatusRepresentation_ActualOutput");

            migrationBuilder.AddColumn<string>(
                name: "StatusRepresentation_Discriminator",
                table: "Submissions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
